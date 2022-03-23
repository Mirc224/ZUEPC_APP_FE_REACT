import config from '../config';
import {LOCALES} from '../i18n/locales';

export const cultureHelper = {
    getCulture
    //currentUser: currentUserSubject.asObservable(),
    //get currentUserValue() { return currentUserSubject.value }
};

function getCulture(culture: string | null = null) : string{
    if(!culture)
    {
        return config.defaultCulture;
    }
    return Object.values(LOCALES).indexOf(culture) > -1 ? culture :  config.defaultCulture;
}
