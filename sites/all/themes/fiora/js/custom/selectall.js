$(function selectAll(theField) {
    var tempval=eval("document."+theField)
    tempval.focus()
    tempval.select()
});