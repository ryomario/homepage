import hello from 'hello-color';

const getInitials = (name) => {
    let initials;
    const nameSplit = name.split(" ");
    const nameLength = nameSplit.length;
    if (nameLength > 1) {
        // Firstname dan Lastname
        initials =
            nameSplit[0].substring(0, 1) +
            nameSplit[nameLength - 1].substring(0, 1);
    } else if (nameLength === 1) {
        initials = nameSplit[0].substring(0, 1);
    } else return;

    return initials.toUpperCase();
};

export const getRandomColor = () => {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}


/*
 * size, ukuran image hasil
 * name, nama lengkap
 * color, warna dalam format #000000
 */
export const createImageFromInitials = (size, name, color) => {
    if (name == null) return;
    name=getInitials(name)

    if (!color || color?.length < 7 || color?.length > 7 || !color?.startsWith('#')) color = getRandomColor();

    const color2 = hello(color).color;

    const canvas=document.createElement('canvas')
    const context=canvas.getContext('2d')
    canvas.width=canvas.height=size

    // background
    // context.fillStyle="#ffffff"
    // context.fillRect(0,0,size,size)

    // // buat lingkaran putih
    // context.fillStyle="#ffffff"
    // context.beginPath()
    // context.arc(size/2,size/2,size/2,0,2*Math.PI)
    // context.fill()
    // lingkaran dengan warna utama
    context.fillStyle=color
    context.beginPath()
    context.arc(size/2,size/2,size/2,0,2*Math.PI)
    context.fill()

    context.fillStyle=color2;
    context.textBaseline='middle'
    context.textAlign='center'
    context.font =`${size/2}px Roboto`
    context.fillText(name,(size/2),(size/2))

    return canvas.toDataURL()
};