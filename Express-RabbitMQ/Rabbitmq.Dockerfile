FROM rabbitmq
RUN rabbitmq-plugins enable rabbitmq_management
CMD ["rabbitmq-server"]