#!/usr/bin/env python
import pika
import uuid
from skf import settings

class SKFLabDeployment(object):

    def __init__(self):
        self.creds = pika.PlainCredentials('admin', 'admin-skf-secret')
        self.connection = pika.BlockingConnection(pika.ConnectionParameters(host=settings.RABBIT_MQ_CONN_STRING, credentials=self.creds))
        self.channel = self.connection.channel()
        result = self.channel.queue_declare(queue='', exclusive=True)
        self.callback_queue = result.method.queue

        self.channel.basic_consume(
            queue=self.callback_queue,
            on_message_callback=self.on_response,
            auto_ack=True)

    def on_response(self, ch, method, props, body):
        if self.corr_id == props.correlation_id:
            self.response = body

    def call(self, n):
        self.response = None
        self.corr_id = str(uuid.uuid4())
        self.channel.basic_publish(
            exchange='',
            routing_key='deployment_qeue',
            properties=pika.BasicProperties(
                reply_to=self.callback_queue,
                correlation_id=self.corr_id,
            ),
            body=n)
        while self.response is None:
            self.connection.process_data_events()
        return str(self.response)