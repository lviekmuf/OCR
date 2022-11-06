export const config = {
    url: process.env.RABBITMQ_URL || "amqp://user:user@rabbitmq:5672",
    queue: process.env.QUEUE || "ocr_queue",
    port: process.env.PORT || 3002,
}
