import {Component} from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'toh-nav',
    templateUrl: 'nav.component.html',
    styleUrls: ['nav.component.css']
})

export class NavComponent {
    menuItems = [
        {link: '/', name: 'Home'},
        {link: '/heroes', name: 'Heroes list'}
    ];

    constructor() {
    }
}
