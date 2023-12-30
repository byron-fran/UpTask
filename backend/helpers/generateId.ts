


export const generateId = () : string => {
     const id = Math.random().toString(16).substring(2) + Date.now().toString(16)
     return id
};