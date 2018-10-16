export default {
    _prt: async to => await ((ms => new Promise(r => setTimeout(r, ms)))(to)),
}