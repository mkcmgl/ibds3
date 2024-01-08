// 绘制多行文本
function drawWrappedText(context, text, x, y, maxWidth = 450, lineHeight = 20) {
    
    var words = text.split('');
    var line = '';

    for (var i = 0; i < words.length; i++) {
        var testLine = line + words[i];
        var metrics = context.measureText(testLine);
        var testWidth = metrics.width;

        if (testWidth > maxWidth && i > 0) {
            context.fillText(line, x, y);
            line = words[i];
            y += lineHeight;
        }
        else {
            line = testLine;
        }
    }

    context.fillText(line, x, y);
}

export {
    drawWrappedText
}