import i18n from '../../i18n'

let msg

function setVideo(video) {
    switch (video) {
        case '2':
            msg = {
                header: '<p style="font-size: 16px;">' + i18n.vueI18n.global.t('vidTwoHeaderOne') + '</p>' +
                    '<p style="font-size: 16px;">' + i18n.vueI18n.global.t('vidTwoHeaderTwo') + '</p>'
            }
            break;
        case '3':
            msg = {
                header: '<p style="font-size: 16px;">' + i18n.vueI18n.global.t('vidThreeHeaderOne') + '</p>' +
                    '<p style="font-size: 16px;">' + i18n.vueI18n.global.t('vidThreeHeaderTwo') + '</p>'
            }
            break;
        case '4':
            msg = {
                header: '<p style="font-size: 16px;">' + i18n.vueI18n.global.t('vidFourHeaderOne') + '</p>' +
                    '<p style="font-size: 16px;">' + i18n.vueI18n.global.t('vidFourHeaderTwo') + '</p>'
            }
            break;
        case '5':
            msg = {
                header: '<p style="font-size: 16px;">' + i18n.vueI18n.global.t('vidFiveHeaderOne') + '</p>' +
                    '<p style="font-size: 16px;">' + i18n.vueI18n.global.t('vidFiveHeaderTwo') + '</p>' +
                    '<p style="font-size: 16px;">' + i18n.vueI18n.global.t('vidFiveHeaderThree') + '</p>'
            }
            break;
        case '6':
            msg = {
                header: '<p style="font-size: 16px;">' + i18n.vueI18n.global.t('vidSixHeaderOne') + '</p>' +
                    '<p style="font-size: 16px;">' + i18n.vueI18n.global.t('vidSixHeaderTwo') + '</p>'
            }
            break;
        case '7':
            msg = {
                header: '<p style="font-size: 16px;">' + i18n.vueI18n.global.t('vidSevenHeaderOne') + '</p>' +
                    '<p style="font-size: 16px;">' + i18n.vueI18n.global.t('vidSevenHeaderTwo') + '</p>'
            }
            break;
        case '8':
            msg = {
                header: '<p style="font-size: 16px;">' + i18n.vueI18n.global.t('vidEightHeaderOne') + '</p>'
            }
            break;
        case '9':
            msg = {
                header: '<p style="font-size: 16px;">' + i18n.vueI18n.global.t('vidNineHeaderOne') + '</p>' +
                    '<p style="font-size: 16px;">' + i18n.vueI18n.global.t('vidNineHeaderTwo') + '</p>'
            }
            break;
        case '10':
            msg = {
                header: '<p style="font-size: 16px;">' + i18n.vueI18n.global.t('vidTenHeaderOne') + '</p>' +
                    '<p style="font-size: 16px;">' + i18n.vueI18n.global.t('vidTenHeaderTwo') + '</p>'
            }
            break;
        case '11':
            msg = {
                header: '<p style="font-size: 16px;">' + i18n.vueI18n.global.t('vid11HeaderOne') + '</p>' +
                    '<p style="font-size: 16px;">' + i18n.vueI18n.global.t('vid11HeaderTwo') + '</p>'
            }
            break;
        case '12':
            msg = {
                header: '<p style="font-size: 16px;">' + i18n.vueI18n.global.t('vid12HeaderOne') + '</p>' +
                    '<p style="font-size: 16px;">' + i18n.vueI18n.global.t('vid12HeaderTwo') + '</p>'
            }
            break;
        default:
            msg = {
                header: '<p style="font-size: 22px; font-weight: 600;" >' + i18n.vueI18n.global.t('headerOne') + '</p>' +
                    '<hr />' +
                    '<p style="font-size: 16px;">' + i18n.vueI18n.global.t('headerTwo') + '</p>' +
                    '<p style="font-size: 16px;">' + i18n.vueI18n.global.t('headerThree') + '</p>' +
                    '<p style="font-size: 16px;">' + i18n.vueI18n.global.t('headerFour') + '</p>'
            }
    }
    return msg;
}

export default {
    setVideo,
}