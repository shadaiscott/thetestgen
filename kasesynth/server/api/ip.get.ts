export default defineEventHandler(async (event) => {
  const { ip } = getQuery(event)
  const config = useRuntimeConfig()

  
const endpoint = `${config.public.ipBaseUrl}/${ip}?apikey=${config.ipApiKey}`

  const response = await fetch(endpoint)
  const data = await response.json()

  if (data.error) {
    throw createError({
      statusCode: 400,
      message: data.reason || 'Failed to fetch IP information'
    })
  }

  return data
})