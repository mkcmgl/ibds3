export default (data, name) => {

    const href = URL.createObjectURL(data);

    const link = document.createElement('a');

    link.href = href;
    link.setAttribute('download', name);

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(href);
}