/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$(document).ready(function () {

    //draw playground.   

    var content = $(".playground");

    var heightW = content.height();
    var widthW = content.width();
    var cellScale = 25;
    var rowCount = heightW / cellScale;
    var colCount = widthW / cellScale;

    rowCount = Math.floor(rowCount);
    colCount = Math.floor(colCount);

    var id;
    var cell;
    var cellCount = "";

    var i;
    for (i = 1; i < colCount; i++) {
        cell = "<div class='playground-line-cell' data-row='' data-col='" + i + "' ></div>";
        cellCount += cell;
    }

    var tempLine;

    var e;
    for (e = 0; e <= rowCount; e++) {
        tempLine = "<div class='playground-line'>" + cellCount + "</div>";
        var lastLine = $(this).find('.playground-line:last-of-type');
        lastLine.find('.playground-line-cell').attr('data-row', e);
        content.append(tempLine);
    }

    var state = 'hra';

//vyhral
    function win(player) {
        state = "koniec";
        $('.modal h2').html(player);
        $('.modal').toggleClass("hide");
    }
    ;

//control
    function control() {

        //vodorovne
        var rowF, colF;
        var dotCount = 0;
        var crossCount = 0;
        var changeRow = 0;
        $('.playground-line').each(function (index) {
            if (changeRow != index) {
                dotCount = 0;
                crossCount = 0;
            }
            ;
            $(this).find('.playground-line-cell').each(function () {
                if ($(this).find('span.dot').length > 0) {
                    dotCount = dotCount + 1;
                } else {
                    dotCount = 0;
                }
                if ($(this).find('span.cross').length > 0) {
                    crossCount = crossCount + 1;
                } else {
                    crossCount = 0;
                }

                if (dotCount === 5) {
                    win("Player 1 vyhral!");
                }
                if (crossCount === 5) {
                    win("Player 2 vyhral!");
                }
            });
        });

//zvislo
        var dotCountV = 0;
        var crossCountV = 0;
        var q;
        var changeCol = 0;

        for (q = 0; q < colCount; q++) {

            if (changeCol != q) {
                dotCountV = 0;
                crossCountV = 0;
            }
            ;
            $('.playground-line').each(function () {

                var attr = q.toString();

                $(this).find('.playground-line-cell').each(function () {
                    var dataCol = $(this).attr('data-col');
                    if (attr === dataCol) {
                        if ($(this).find('span.dot').length > 0) {
                            dotCountV = dotCountV + 1;
                        } else {
                            dotCountV = 0;
                        }
                        if ($(this).find('span.cross').length > 0) {
                            crossCountV = crossCountV + 1;
                        } else {
                            crossCountV = 0;
                        }

                        if (dotCountV === 5) {
                            win("Player 1 vyhral!");
                        }
                        if (crossCountV === 5) {
                            win("Player 2 vyhral!");
                        }
                    }
                    ;

                });

            });
        }


    }
    ;

    //draw dot or cross
    var player = 1;
    var itemDot = "<span class='drawItem dot'></span>";
    var itemCross = "<span class='drawItem cross'></span>";

    var undoArray = [];

    function defaultPosition() {
        //default posizicie
        var defaultCross = [5, 2, 7, 2, 4, 3];
        $('.playground-line-cell[data-row="' + defaultCross[1] + '"][data-col="' + defaultCross[0] + '"]').append(itemCross);
        $('.playground-line-cell[data-row="' + defaultCross[3] + '"][data-col="' + defaultCross[2] + '"]').append(itemCross);
        $('.playground-line-cell[data-row="' + defaultCross[5] + '"][data-col="' + defaultCross[4] + '"]').append(itemCross);

        var defaultDots = [4, 5, 7, 4, 6, 3];
        $('.playground-line-cell[data-row="' + defaultDots[1] + '"][data-col="' + defaultDots[0] + '"]').append(itemDot);
        $('.playground-line-cell[data-row="' + defaultDots[3] + '"][data-col="' + defaultDots[2] + '"]').append(itemDot);
        $('.playground-line-cell[data-row="' + defaultDots[5] + '"][data-col="' + defaultDots[4] + '"]').append(itemDot);

        var DefaultundoArray = [4, 5, 5, 2, 7, 4, 7, 2, 6, 3, 4, 3];
        undoArray = DefaultundoArray;
    }
    ;
    defaultPosition();

    $(this).on('click', '.playground-line-cell', function () {
        if (state === "hra") {
            var cellContent = $(this).html();
            var dataCol = $(this).attr('data-col');
            var dataRow = $(this).attr('data-row');

            undoArray.push(dataCol, dataRow);

            if (cellContent.length === 0) {
                $(this).append(function () {
                    if (player === 1) {
                        $(this).append(itemDot);
                        player = 2;
                    } else {
                        $(this).append(itemCross);
                        player = 1;
                    }
                    $(".player li").toggleClass('hide');
                    $("nav").toggleClass('pl-1');
                });
            }


            control();
        }

    });


    $("#undo").click(function () {
        if (state === "hra") {
            var lastRow = undoArray.pop();
            var lastCol = undoArray.pop();

            $('.playground-line-cell[data-col="' + lastCol + '"][data-row="' + lastRow + '"]').html("");
        }
    });

    $("#restart").click(function () {
        state = "hra";
        $('.modal').toggleClass("hide");
        $('.playground-line-cell').html("");
        defaultPosition();
    });
});