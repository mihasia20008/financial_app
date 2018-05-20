const nodemailer = require('nodemailer');

const mailTemplate = {
    from: 'easycosts@netex.pro',
    to: '#usermail#',
    subject: '#subject#',
    mailConfirmHtml: '<h1 style="margin-top: 0;">#username#, Здравствуйте!</h1>' +
        '<p style="font-size:16px;">Поздравляем с регистрацией на EasyCosts!</p>' +
        '<p style="font-size:16px;">Для дальнейшего использования учетной записи необходимо подтвердить адрес электронной почты.</p>' +
        '<br>' +
        '<a href="#userlink#" style="display: block;text-decoration: none;border-radius: 5px;background: #6200ea;width: 200px;color: #fff;text-transform: uppercase;font-size: 18px;text-align: center;padding: 13px 0;cursor: pointer;">Подтвердить</a>' +
        '<br>' +
        '<p style="font-size:16px;">С уважением, команда <a href="https://easycosts.me">EasyCosts</a></p>',
    mailRestoreHtml: '<h1 style="margin-top: 0;">#username#, Здравствуйте!</h1>' +
        '<p style="font-size:16px;">Был запрошен сброс пароля Вашей учетной записи в приложении EasyCosts! <br> Для продолжения перейдите по ссылке ниже.</p>' +
        '<br>' +
        '<a href="#userlink#" style="display: block;text-decoration: none;border-radius: 5px;background: #6200ea;width: 200px;color: #fff;text-transform: uppercase;font-size: 18px;text-align: center;padding: 13px 0;cursor: pointer;">Сбросить</a>' +
        '<br>' +
        '<p style="font-size:16px;">Если Вы не пользовались функцией восстановления доступа и не хотите получить новый пароль, вероятно, другой пользователь случайно указал Ваш адрес при восстановлении пароля. В таком случае удалите это сообщение.</p>' +
        '<p style="font-size:16px;">Данное письмо генерируется автоматически, на него не следует отвечать.</p>' +
        '<br>' +
        '<p style="font-size:16px;">С уважением, команда <a href="https://easycosts.me">EasyCosts</a></p>'
}

module.exports = function(type, userName, userMail, mailSubject, userLink) {
    return new Promise((resolve, reject) => {
        const transporter = nodemailer.createTransport({
            service: 'yandex',
            auth: {
                user: 'easycosts@netex.pro',
                pass: 'zdyhGvOjCzSsWktJ'
            }
        });

        let mailOptions = {
            from: mailTemplate.from,
            to: userMail,
            subject: mailSubject,
        };

        switch (type) {
            case 'confirm':
                mailOptions.html = mailTemplate.mailConfirmHtml.replace('#username#', userName).replace('#userlink#', userLink);                    break;
            case 'restore':
                mailOptions.html = mailTemplate.mailRestoreHtml.replace('#username#', userName).replace('#userlink#', userLink);
                break;
            default:
                break;
        }
        
        if (typeof mailOptions.html !== 'undefined')
            transporter.sendMail(mailOptions, (err, info) => {
                if(err)
                    reject(err);
                else
                    resolve(info);
            });
        else reject({message: 'Неверный тип шаблона письма'});
    });
};
