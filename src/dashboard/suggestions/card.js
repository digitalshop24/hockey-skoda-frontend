'use strict';

import angular from "angular";

export default angular.module('dashboard.suggestions.card-init', [])
    .directive('cardInit', function ($rootScope) {
        return {
            link: function () {
                angular.element(document).ready(function () {
                    $('.card-create > button').click(function(){
                        var $img = $('.select-img');
                        var imgUrl = $('.slick-active').find('img').attr('src');
                        $img.attr('src', imgUrl).width('auto').height('auto');
                        var $canvas = $('.card-canvas');
                        var width = $img.width();
                        console.log(width);
                        if(width<830){
                            width = 830;
                            $img.width(width);
                        }
                        width = $img.width();
                        var height = $img.height();
                        if(height<880){
                            $img.height(880);
                            height = $img.height()
                            $img.width('auto');
                            width = $img.width();
                        }
                        $img.fadeOut(50);
                        $canvas.fadeIn(0);
                        $('.card-canvas').attr('width', width).attr('height', height);
                        var canvas = $canvas[0];
                        var ctx = canvas.getContext('2d');
                        ctx.drawImage($img[0], 0, 0, width, height);
                        ctx.globalAlpha=0.7;
                        ctx.fillRect(0, 0, width, height);
                        ctx.globalAlpha=1;
                        ctx.fillStyle = "#fff";
                        ctx.font = "italic 17px Arial";
                        ctx.textBaseline = "middle";
                        ctx.textAlign = "center";
                        var author = $('.card-secondname').val() + ' ';
                        author += $('.card-firstname').val();
                        var to = $('.card-to').val();
                        if(to!=''){
                            to += ' — ';
                        }
                        var text = $('.card-text').val();

                        var marginLeft = width/2;
                        var marginTop = height/2;
                        var maxWidth = width-200;
                        var lineHeight = 22;
                        var heightTo = textHeight(ctx,to,maxWidth,lineHeight);
                        var heightText = textHeight(ctx,text,maxWidth,lineHeight);
                        var heightAuthor = textHeight(ctx,author,maxWidth,lineHeight);
                        // печатаем кому пожелание
                        wrapText(ctx, to, maxWidth, marginLeft, marginTop-heightText/2-heightTo, lineHeight);
                        // печатаем текст пожелания
                        wrapText(ctx, text, maxWidth, marginLeft, marginTop-heightText/2, lineHeight);
                        // печатаем автора
                        ctx.font = "16px Arial";
                        wrapText(ctx, author, maxWidth, marginLeft, marginTop+heightText/2+22, lineHeight);
                        ctx.fillStyle = "#4da736";
                        ctx.font = "italic 70px Georgia";
                        ctx.textBaseline = "middle";
                        ctx.textAlign = "left";
                        ctx.fillText('“',40,marginTop-heightText/2-8);
                        ctx.textAlign = "right";
                        ctx.fillText('„',width-40,marginTop-heightText/2-41);
                        var resultUrl = canvas.toDataURL();

                        $rootScope.$broadcast('suggestions:imageMerged', {
                            image: resultUrl
                        });
                        /*$canvas.fadeOut(50);
                        $img.attr('src',resultUrl);
                        $img.fadeIn(50);*/
                        // ctx.fillText(text, width/2, 50);
                        return false;
                    });

                    function textHeight(context, text, maxWidth, lineHeight){
                        var heightText = 0;
                        var words = text.split(" ");
                        var countWords = words.length;
                        var line = "";
                        for (var n = 0; n < countWords; n++) {
                            var testLine = line + words[n] + " ";
                            var testWidth = context.measureText(testLine).width;
                            if (testWidth > maxWidth) {
                                line = words[n] + " ";
                                heightText += lineHeight;
                            }
                            else {
                                line = testLine;
                            }
                            if(n == countWords-1){
                                if(line != ''){
                                    line = words[n] + " ";
                                    heightText += lineHeight;

                                }
                            }
                        }
                        return heightText;
                    }
                    function wrapText(context, text, maxWidth, marginLeft, marginTop, lineHeight)
                    {
                        var words = text.split(" ");
                        var countWords = words.length;
                        var line = "";
                        for (var n = 0; n < countWords; n++) {
                            var testLine = line + words[n] + " ";
                            var testWidth = context.measureText(testLine).width;
                            if (testWidth > maxWidth) {
                                context.fillText(line, marginLeft, marginTop);
                                line = words[n] + " ";
                                marginTop += lineHeight;
                            }
                            else {
                                line = testLine;
                            }
                            if(n == countWords-1){
                                if(line != ''){
                                    context.fillText(line, marginLeft, marginTop);
                                    line = words[n] + " ";
                                    marginTop += lineHeight;

                                }
                            }
                        }
                        // context.fillText(line, 0, 0);
                    }
                });
            }
        }
    });