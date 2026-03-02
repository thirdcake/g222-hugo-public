class WebSiteChoice extends HTMLElement {
    static template = `
    <div class="card">
        <div class="card-body">
            <h3 class="card-title h5 m-1">1. 予算</h3>
            <p>事務所のホームページにかけられる予算を教えてください。</p>
            <div class="form-check">
                <input class="form-check-input" type="radio"
                    name="budget" id="budget0" checked>
                <label class="form-check-label" for="budget0">
                    初期費用0円、年間コスト0円
                </label>
            </div>
            <div class="form-check">
                <input class="form-check-input" type="radio"
                    name="budget" id="budget1">
                <label class="form-check-label" for="budget1">
                    初期費用1万円以上、年間コスト3万円以上
                </label>
            </div>
            <div class="form-check">
                <input class="form-check-input" type="radio"
                    name="budget" id="budget2">
                <label class="form-check-label" for="budget2">
                    初期費用30万円以上、年間コスト15万円以上
                </label>
            </div>
        </div>
        <div class="card-body">
            <h3 class="card-title h5 m-1">2. IT スキル</h3>
            <p class="card-text">ホームページの管理者のITスキルを教えてください。</p>
            <div class="form-check">
                <input class="form-check-input" type="radio"
                    name="skill" id="skill1" checked>
                <label class="form-check-label" for="skill1">
                    ワードやエクセルが使える
                </label>
            </div>
            <div class="form-check">
                <input class="form-check-input" type="radio"
                    name="skill" id="skill2">
                <label class="form-check-label" for="skill2">
                    自分でプログラミングできる
                </label>
            </div>
        </div>
        <div class="card-body">
            <h3 class="card-title h5 m-1">3. 判定</h3>
            <button type="button" data-bs-toggle="collapse"
                data-bs-target="#collapse-result"
                aria-expanded="false" 
                aria-controls="collapse-result"
                class="btn btn-outline-secondary">
                判定する
            </button>
        </div>
        <div class="card-body">
            <h3 class="card-title h5 m-1">結果</h3>
            <div class="collapse" id="collapse-result">
                <div class="card card-body" id="result-message">
                    結果がここに表示されます。
                </div>
            </div>
        </div>
    </div>
    `;

    #budget = 0;
    #skill = 1;

    constructor() {
        super();

        this.div = document.createElement('div');
        this.div.innerHTML = WebSiteChoice.template;
    }
    connectedCallback() {
        this.appendChild(this.div);
        const bsCollapse = new bootstrap.Collapse('#collapse-result', {
            toggle: false
        });
        
        this.div.addEventListener('change', ev => {
            bsCollapse.hide();
            switch(ev.target.name) {
                case 'budget':
                    switch(ev.target.id) {
                        case 'budget0':
                            this.#budget = 0;
                            break;
                        case 'budget1':
                            this.#budget = 1;
                            break;
                        case 'budget2':
                            this.#budget = 2;
                            break;
                    }
                    break;
                case 'skill':
                    switch(ev.target.id) {
                        case 'skill1':
                            this.#skill = 1;
                            break;
                        case 'skill2':
                            this.#skill = 2;
                            break;
                    }
                    break;
            }
        }, false);

        this.div.addEventListener('show.bs.collapse', ()=>{
            console.log(this.div.querySelector('#result-message'));
            this.div.querySelector('#result-message').innerHTML = this.message;
        }, false);
    }

    get message() {
        if(this.#skill === 2) {
            return '<p class="card-text">プログラミングのできる方には釈迦に説法かもしれませんが、 <a href="#result-4">GitHub Pagesや、Cloudflare Pagesなど</a> の利用をおすすめします。</p>'
        }else if(this.#budget === 0) {
            return '<p class="card-text">無料サービスを利用したい場合は、 <a href="#result-0">Googleビジネスプロフィール</a> や、 <a href="#result-1">はてなブログや、noteなどのブログサービス</a> をおすすめします。</p>'
        }else if(this.#budget === 1) {
            return '<p class="card-text">低予算で利用可能な有料サービスをお探しの場合は、 <a href="#result-2">ジンドゥーや、ameba owndなどのノーコードツール</a> をおすすめします。</p>'
        }else{
            return '<p class="card-text">まとまった予算を取れる場合は、 <a href="#result-3">WordPressなど</a> の利用をおすすめします。</p>'
        }
    }
}
customElements.define('web-site-choice', WebSiteChoice);

