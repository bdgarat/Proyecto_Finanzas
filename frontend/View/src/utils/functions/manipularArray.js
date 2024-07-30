export function invertirOrden(data)
{
    let arrayRevert = [];
    for(let i = data.length-1; i>=0;i--)
    {
        arrayRevert.push(data[i]);
    }
    return arrayRevert;
}