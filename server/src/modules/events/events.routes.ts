import {FastifyPluginAsync} from "fastify";
import {AppDataSource} from "../../db/data-source";
import {Event} from "../../db/entities/event.entity";
import {EventParticipant} from "../../db/entities/event-participant.entity";
import {createEventSchema, updateEventSchema} from "./events.schemas";

type EventParams = { id: string };

export const eventsRoutes: FastifyPluginAsync = async (app) => {
    const eventRepository = AppDataSource.getRepository(Event);
    const participantRepository = AppDataSource.getRepository(EventParticipant);

    app.post('/', {preHandler: [app.authenticate]}, async (request, reply) => {
        const parsedBody = createEventSchema.safeParse(request.body)

        if (!parsedBody.success) {
            return reply.code(400).send({
                message: "Validation error",
                errors: parsedBody.error.issues.map(issue => ({
                    path: issue.path.join('.'),
                    message: issue.message
                }))
            })
        }

        const {title, description, capacity, address, startedAt} = parsedBody.data;

        const event = eventRepository.create({
            title,
            description,
            capacity,
            address,
            startedAt,
            ownerId: request.user.sub
        })

        const savedEvent = await eventRepository.save(event)

        return reply.code(201).send(savedEvent)
    })

    app.get('/', {preHandler: [app.authenticate]}, async () => {
        return eventRepository.find({
            order: {startedAt: 'ASC'}
        })
    })

    app.get<{ Params: EventParams }>('/:id', {preHandler: [app.authenticate]}, async (request, reply) => {
        const event = await eventRepository.findOne({
            where: {id: request.params.id},
        })
        if (!event) {
            return reply.code(404).send({
                message: "Event is not found"
            })
        }

        return reply.send(event)
    })

    app.patch<{ Params: EventParams }>('/:id', {preHandler: [app.authenticate]}, async (request, reply) => {
        const event = await eventRepository.findOne({
            where: {id: request.params.id},
        })
        if (!event) {
            return reply.code(404).send({
                message: "Event is not found"
            })
        }

        if (event.ownerId !== request.user.sub) {
            return reply.code(403).send({
                message: "Only owner can edit this event",
            })
        }

        const parsedBody = updateEventSchema.safeParse(request.body)

        if (!parsedBody.success) {
            return reply.code(400).send({
                message: "Validation error",
                errors: parsedBody.error.issues.map(issue => ({
                    path: issue.path.join('.'),
                    message: issue.message
                }))
            })
        }

        const {title, description, capacity, address, startedAt} = parsedBody.data;

        if (title !== undefined) {
            event.title = title
        }
        if (description !== undefined) {
            event.description = description
        }
        if (capacity !== undefined) {
            event.capacity = capacity
        }
        if (address !== undefined) {
            event.address = address
        }
        if (startedAt !== undefined) {
            event.startedAt = startedAt
        }

        const updatedEvent = await eventRepository.save(event)

        return reply.send(updatedEvent)

    })

    app.delete<{ Params: EventParams }>('/:id', {preHandler: [app.authenticate]}, async (request, reply) => {
        const event = await eventRepository.findOne({where: {id: request.params.id}})

        if (!event ) {
            return reply.code(404).send({
                message: "Event is not found"
            })
        }

        if (event.id !== request.params.id) {
            return reply.code(403).send({
                message: 'Only owner can delete this event'
            })
        }

        await eventRepository.delete({ id : event.id})
        return reply.code(204).send()
    })
}