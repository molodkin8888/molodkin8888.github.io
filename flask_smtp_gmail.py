#!/usr/bin/env python
# -*- coding: utf-8 -*-

# USAGE: apt-get update &&  apt-get install python python-pip && pip install flask && python SCRIPT_NAME


from __future__ import unicode_literals

import json
import logging
import smtplib
from flask import (
    Flask,
    request,
    jsonify,
)


# ================== DEFAULT SETTINGS ====================== #
API_PORT = 9080
API_ROUTE = 'process-form'

MAILER_HOST = 'smtp.gmail.com'
MAILER_PORT = 465

SOURCE_MAIL = 'testsendsemail@gmail.com'
PASSWORD = '8041488test'

TARGET_EMAILS = ['www.globaltrouble@gmail.com', ]
SUBJECT = 'Form submit notification'
# ==================== END DEFAULTS ===================== #
log = logging.getLogger()
log.addHandler(logging.StreamHandler())
log.setLevel(logging.INFO)
log.info(' * Starting app...')

app = Flask(__name__)


@app.route('/{}'.format(API_ROUTE),  methods=['POST'])
def hello():
    payload = {
        'args': dict(request.args),
        'form': dict(request.form),
    }

    log.info('Payload: %s', payload)
    send_email(
        host=MAILER_HOST,
        port=MAILER_PORT,
        source_mail=SOURCE_MAIL,
        source_password=PASSWORD,
        target_emails=TARGET_EMAILS,
        payload=json.dumps(payload),
    )
    return jsonify(payload)


def send_email(host, port, source_mail, source_password, target_emails, payload):
    log.info('Sending email from %s, to %s', source_mail, target_emails)
    content = create_content(payload)
    try:
        server = smtplib.SMTP_SSL(host, port)
        server.ehlo()
        server.login(source_mail, source_password)
        server.sendmail(source_mail, target_emails, content)
        server.close()
    except Exception:
        logging.exception(
            'Error send email, from: %s (password=%s), to: %s, content: %s',
            source_mail,
            source_password,
            target_emails,
            content,
        )
    else:
        log.info('Send!')


def create_content(payload):
    return """

    %s
    """ % (payload)


if __name__ == '__main__':
    app.run(
        port=API_PORT,
    )
