'use strict';

const config = {
    init_settings: {
        container: 'map',  // 地図を表示するコンテナーのIDを指定
        style: {  // 地理院ベクトルタイルのスタイル
            version: 8,
            sources: {
                pale: {  // 地理院淡色地図
                    type: 'raster',
                    tiles: ["https://cyberjapandata.gsi.go.jp/xyz/pale/{z}/{x}/{y}.png"],
                    tileSize: 256,
                    attribution: "地図情報の出典: <a href=\"https://maps.gsi.go.jp/development/ichiran.html\" target=\"_blank\">地理院タイル</a>",
                }
            },
            layers: [
                {
                    id: 'pale-layer',
                    type: 'raster',
                    source: 'pale'
                }
            ]
        },
        center: [130.534375, 33.312430],  // 初期画面の中心
        zoom: 13,     // 初期ズームレベル
        minZoom: 11,   // 最小ズームレベル
        maxZoom: 17,  // 最大ズームレベル
        maxBounds: [  // 表示範囲
            [130.45, 33.25], // 南西 (lng, lat)
            [130.65, 33.35]  // 北東 (lng, lat)
        ],
    },
    shopsData: {  // お店のデータ
        "type": "FeatureCollection",
        "features": [
            {
                "type": "Feature",
                "geometry": { "type": "Point", "coordinates": [130.607422, 33.323859] },
                "properties": { "name": "ル・ボヌール" }
            },
            {
                "type": "Feature",
                "geometry": { "type": "Point", "coordinates": [130.538589, 33.321649] },
                "properties": { "name": "スマイリークレープ ゆめタウン久留米店" }
            },
            {
                "type": "Feature",
                "geometry": { "type": "Point", "coordinates": [130.542583, 33.319465] },
                "properties": { "name": "ボンズクレープ 楽市街道くるめ店" }
            },
            {
                "type": "Feature",
                "geometry": { "type": "Point", "coordinates": [130.521122, 33.312466] },
                "properties": { "name": "ディッパーダン 西鉄久留米駅店" }
            },
            {
                "type": "Feature",
                "geometry": { "type": "Point", "coordinates": [130.520118, 33.313481] },
                "properties": { "name": "季ららのクレープ" }
            },
            {
                "type": "Feature",
                "geometry": { "type": "Point", "coordinates": [130.516485, 33.306980] },
                "properties": { "name": "シュシュクレープ 花畑店" }
            },
            {
                "type": "Feature",
                "geometry": { "type": "Point", "coordinates": [130.532354, 33.306197] },
                "properties": { "name": "ノナカマチクレープ" }
            },
            {
                "type": "Feature",
                "geometry": { "type": "Point", "coordinates": [130.570089, 33.315678] },
                "properties": { "name": "北キツネの大好物 久留米店" }
            }
        ]
    }
}

// Mapオブジェクトを生成
const map = new maplibregl.Map(config.init_settings);


// マーカーを作成
const markers = config.shopsData.features.map(feature => {
    const marker = new maplibregl.Marker()
        .setLngLat(feature.geometry.coordinates)
        .setPopup(new maplibregl.Popup().setText( feature.properties.name ))
        .addTo(map);
    return marker;
});


// 地図の中央表示リンク
const links = config.shopsData.features.reduce((ul, feature, index) => {
    const li = document.createElement('li');
    const anc = document.createElement('a');
    anc.textContent = feature.properties.name;
    anc.href = '#';
    anc.classList.add('link');
    anc.dataset.index = index;
    anc.dataset.coordsEW = feature.geometry.coordinates[0];
    anc.dataset.coordsNS = feature.geometry.coordinates[1];
    anc.addEventListener('click', (ev)=>{
        ev.preventDefault();
        try {
            const target = ev.target;
            const ew = Number(target.dataset.coordsEW);
            const ns = Number(target.dataset.coordsNS);
            const coords = [ew, ns];
            markers.forEach(marker => {
                if(marker.getPopup().isOpen() === true) {
                    marker.togglePopup();
                }
            })
            map.flyTo({
                center: coords,
                zoom: 15,
                essential: false
            });
            map.once('moveend', () => {
                const index = Number(target.dataset.index);
                const marker = markers[index];
                if(marker.getPopup().isOpen() === false) {
                    marker.togglePopup();
                }
            });
        }catch(e) {
            console.error('button click error: ', e);
        }
    }, false);
    li.appendChild(anc);
    ul.appendChild(li);
    return ul;
}, document.createElement('ul'));
document.getElementById('map-index').appendChild(links);
