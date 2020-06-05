import { Observable, Subject } from 'rxjs';
import { HeaderDetails } from './interfaces';

export class OrxeHeader {
    static headerSubject = new Subject<HeaderDetails>();
    static leftIconSubject = new Subject<any>();

    static headerDetails: HeaderDetails = {
        title: '',
        subtitle: '',
        leftIcon: '',
        rightIcon: '',
        showMenuIcon: false
    }
    
    static getDetails(): Observable<HeaderDetails>{
        return this.headerSubject.asObservable();
    }

    static leftIconListener(): Observable<any> {
        return this.leftIconSubject.asObservable();
    }

    static leftIconClicked() {
        this.leftIconSubject.next();
    }

    static update(headerDetails: HeaderDetails) {
        this.headerDetails.title = headerDetails.title;
        this.headerDetails.subtitle = headerDetails.subtitle;
        this.headerDetails.leftIcon = headerDetails.leftIcon;
        this.headerDetails.rightIcon = headerDetails.rightIcon;
        this.headerDetails.showMenuIcon = headerDetails.showMenuIcon;

        this.headerSubject.next(this.headerDetails)
    }
}