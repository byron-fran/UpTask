export const formatDate = (date: string ) => {
    const newDate = new Date(date.split('T')[0].split('-').join(','));
    return newDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long'
    } );
}