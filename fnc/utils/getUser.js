module.exports = async (client, user) => {
	if (!user) throw new TypeError("Podaj użytkownika")
	client.users.fetch(user)
	return client.users.cache.get(user)
}