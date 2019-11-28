export const getUsuarioLocalStorage = () => JSON.parse(localStorage.getItem('usuarioLogado'))
export const deleteUsuarioLocalStorage = () => localStorage.removeItem('usuarioLogado')
export const setUsuarioLocalStorage = usuario => localStorage.setItem('usuarioLogado', JSON.stringify(usuario))