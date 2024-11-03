import {Kafka} from 'kafkajs'

const kafka = new Kafka({
    brokers:[]
})



export async function createProducer(){
    const producer = kafka.producer()
    await producer.connect();
    return producer;
}

export default kafka;