const fastify = require('fastify')

const actions = require('./lib/actions')
const schemas = require('./lib/schemas')

const PORT = process.env.PORT || 3000
const DEBUG = (process.env.NODE_ENV !== 'production')
const serverOpts = (DEBUG) ? { logger: { prettyPrint: true } } : {}
const server = fastify(serverOpts)

server.route({
  method: 'POST',
  url: '/register',
  schema: schemas.register,
  handler: async (request, reply) => {
    try {
      await actions.register(request.body)
      reply.code(200).send()
    } catch (err) {
      reply.code(500).send()
    }
  }
})

server.listen(PORT, function (err) {
  if (err) throw err
  console.log(`server listening on ${server.server.address().port}`)
})
