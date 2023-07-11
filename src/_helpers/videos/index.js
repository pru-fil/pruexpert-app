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