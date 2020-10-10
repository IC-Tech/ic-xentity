/* Info: https://en.wikipedia.org/wiki/List_of_XML_and_HTML_character_entity_references, https://html.spec.whatwg.org/multipage/named-characters.html#named-character-references */
const { entities } = require('./entities.json')
const decode = a => a.replace(/&(#(x)?)?([a-z0-9]+);/gi, (a,en,eh,v) => {
	if(en) return String.fromCharCode(parseInt(v, eh ? 16 : 10))
	v = v.toLowerCase()
	if(entities.some(e => e.name == v ? [v = e.char] : 0)) return String.fromCharCode(v)
	return a
})
const encode = (a, op) => {
	op = op || {}
	var _entities = !op.mode || op.mode == 'standard' ? entities : [{name: 'lt', char: 60}, {name: 'gt', char: 62}, {name: 'amp', char: 38}, {name: 'apos', char: 39}, {name: 'quot', char: 34}]
	return Array.from(a).map(a => {
		var e, char = a.codePointAt(0)
		if(!_entities.some(f => f.char == char ? [e = f] : 0)) return a
		return `&${op.entity ? '' : '#x'}${op.entity ? e.name : e.char.toString(16)};`
	}).join('')
}

exports.decode = decode
exports.encode = encode
