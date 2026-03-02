class ToDay extends HTMLElement {
    connectedCallback() {
        const span = document.createElement('span');
        const today = new Date();
        span.textContent = `${today.getMonth()+1}月${today.getDate()}日`;
        this.appendChild(span);
    }
}
customElements.define('to-day', ToDay);

class CalendarTable extends HTMLElement {
    table = document.createElement('table');
    tbody = document.createElement('tbody');
    constructor() {
        super();
        this.table.classList.add('table', 'table-striped');
        const caption = document.createElement('caption');
        caption.textContent = '業務予定カレンダー';
        this.table.appendChild(caption);
        const thead = document.createElement('thead');
        const tr = ['日付', '午前', '午後'].reduce((tr, str) => {
            const td = document.createElement('td');
            td.textContent = str;
            tr.appendChild(td);
            return tr;
        }, document.createElement('tr'));
        thead.appendChild(tr);
        this.table.appendChild(thead);
        this.table.appendChild(this.tbody);
    }
    connectedCallback() {
        this.appendChild(this.table);
        const url = new URL('/calendar.json');
        const date = new Date();
        const param = `${date.getMonth() + 1}-${date.getDate()}`;
        url.searchParams.set('d', param);
        fetch(url).then(res=>res.json()).then(data=>{
            const frag = data.busy.reduce((p,c)=>{
                const tr = document.createElement('tr');
                const date = new Date(c.day);
                if(date.getDay() === 0 || date.getDay() === 6){
                    c.am = false;
                    c.pm = false;
                }
                const dateTd = document.createElement('td');
                const youbi = ['日', '月', '火', '水', '木', '金', '土'];
                dateTd.textContent = `${date.getDate()}（${youbi[date.getDay()]}）`;
                tr.appendChild(dateTd);
                const amTd = document.createElement('td');
                amTd.textContent = c.am ? '○':'×';
                tr.appendChild(amTd);
                const pmTd = document.createElement('td');
                pmTd.textContent = c.pm ? '○':'×';
                tr.appendChild(pmTd);
                p.appendChild(tr);
                return p;
            }, document.createDocumentFragment());
            this.tbody.appendChild(frag);
        });
    }
}
customElements.define('calendar-table', CalendarTable);