export const timeFormatter = (time) =>{
    const options = {hour: 'numeric', minute: '2-digit', hour12: true}
    return new Date(time).toLocaleTimeString('en-US', options);
}