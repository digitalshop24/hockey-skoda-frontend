'use strict';

import angular from "angular";

export default angular.module('dashboard.tantam-init', [])
    .directive('tantamInit', function ($rootScope) {
        return {
            link: function () {
                angular.element(document).ready(function () {
                    var $loader = $('.loader-wrapper');
                    var options, url;
                    var jcrop_api;
                    var context;
                    function tamtam() {
                        context = this;
                        this.$button = $('#uploadButton');
                        this.$input = this.$button.find('input');
                        this.$img = $('#loadimg');
                        this.width = function () {
                            return this.$img.width();
                        }
                        this.height = function () {
                            return this.$img.height();
                        }
                        this.change = function () {
                            var inputFile = this.files;
                            if (context.$input.val() != '') {
                                var inputFile = this.files[0];
                                var reader = new FileReader();
                                $loader.fadeIn(0);
                                reader.onload = function (event) {
                                    context.$img.attr("src", event.target.result);
                                    url = context.$img.attr("src");
                                    context.modal();
                                    $('#loading-canvas').attr('width', 0).attr('height', 0);
                                    $loader.fadeOut(100);
                                    // $('#cropModal').modal('show');
                                    // context.crop($img);
                                };
                                reader.onerror = function (event) {
                                    // alert("Ошибка: " + event.target.error.code);
                                };
                                reader.readAsDataURL(inputFile);
                            }

                        };
                        this.$modal = $('#cropModal');
                        this.modal = function () {
                            var $modal = context.$modal;
                            $modal.modal({
                                backdrop: 'static',
                                keyboard: false
                            });
                            $modal.on('shown.bs.modal', function () {
                                tamtam.crop();
                            });

                        };
                        this.crop = function (img) {
                            var x1, y1, x2, y2, w, h;
                            $('#loadimg').Jcrop({
                                onChange: showCoords,
                                onSelect: showCoords,
                                onload: showCoords
                            }, function () {
                                jcrop_api = this;
                            });
                            jcrop_api.setSelect([40, 40, parseInt($('#loadimg').width()) - 40, parseInt($('#loadimg').height()) - 40]);
                            // Соблюдать пропорции
                            $('#ar_lock').change(function (e) {
                                jcrop_api.setOptions(this.checked ?
                                {aspectRatio: 4 / 3} : {aspectRatio: 0});
                                jcrop_api.focus();
                            });
                            // Установка минимальной/максимальной ширины и высоты
                            $('#size_lock').change(function (e) {
                                jcrop_api.setOptions(this.checked ? {
                                    minSize: [80, 80],
                                    maxSize: [350, 350]
                                } : {
                                    minSize: [0, 0],
                                    maxSize: [0, 0]
                                });
                                jcrop_api.focus();
                            });
                            // Изменение координат
                            function showCoords(c) {
                                x1 = c.x;
                                y1 = c.y;
                                x2 = c.x2;
                                y2 = c.y2;
                                w = c.w;
                                h = c.h;

                                options = {
                                    x1: x1,
                                    y1: y1,
                                    x2: x2,
                                    y2: y2,
                                    w: w,
                                    h: h
                                }
                                // console.clear();
                                // console.log(options);

                            }

                            function jcropRemove() {
                                context.$img.removeAttr('style');
                                if ($('div').is('.jcrop-holder')) {
                                    jcrop_api.destroy();
                                }
                            }

                            context.$modal.on('hidden.bs.modal', function (e) {
                                jcropRemove();
                            });

                        }


                    }

                    function jcropInit() {
                        alert('init!');
                        jcrop_api = $.Jcrop('#loadimg');
                        jcrop_api.setSelect([0, 0, parseInt($('#loadimg').width()), parseInt($('.#loadimg').height())])
                    }

                    function saveCrop() {
                        var originalWidth = context.width();
                        var originalHeight = context.height();
                        $('#loading-canvas').attr('width', originalWidth).attr('height', originalHeight);
                        $loader.fadeIn(0);
                        // $('#cropModal').modal('hide');
                        var canvas, ctx, url, temp_ctx, temp_canvas, x, y, width, height, vData;

                        // рисуем картинку по размеру окна
                        canvas = $('#loading-canvas')[0];
                        ctx = canvas.getContext('2d');
                        ctx.drawImage(tamtam.$img[0], 0, 0, originalWidth, originalHeight);
                        ctx.drawImage(canvas, 0, 0, originalWidth, originalHeight, 0, 0, originalWidth, originalHeight);
                        url = canvas.toDataURL();
                        tamtam.$img.attr('src', url);

                        // обрезаем выбранную область
                        x = options.x1;
                        y = options.y1;
                        width = options.w;
                        height = options.h;
                        temp_canvas = $('#loading-canvas')[0];
                        temp_ctx = temp_canvas.getContext('2d');
                        temp_canvas.width = width;
                        temp_canvas.height = height;
                        temp_ctx.drawImage(context.$img[0], x, y, width, height, 0, 0, width, height);
                        vData = temp_canvas.toDataURL();
                        $('.crop-result').attr('src', vData);
                        resizeableImage($('.tamtam-img'));
                        $loader.fadeOut(0);
                    }


                    $('#save-crop').click(function () {
                        saveCrop();

                    });

                    var tamtam = new tamtam();
                    $('.file-photo').change(tamtam.change);

                    var isInit = true;
                    var resizeableImage = function (image_target) {
                        // Some variable and settings
                        var $container,
                            orig_src = new Image(),
                            image_target = $(image_target).get(0),
                            event_state = {},
                            constrain = false,
                            min_width = 60, // Change as required
                            min_height = 60,
                            max_width = 800, // Change as required
                            max_height = 900,
                            resize_canvas = document.createElement('canvas');

                        var init = function () {

                            // When resizing, we will always use this copy of the original as the base
                            orig_src.src = image_target.src;

                            // Wrap the image with the container and add resize handles
                            if (isInit) {
                                $(image_target).wrap('<div class="resize-container"></div>')
                                    .before('<span class="resize-handle resize-handle-nw"></span>')
                                    .before('<span class="resize-handle resize-handle-ne"></span>')
                                    .before('<span class="resize-wide"></span>')
                                    .after('<span class="resize-handle resize-handle-se"></span>')
                                    .after('<span class="resize-handle resize-handle-sw"></span>');
                                isInit = false;
                            }
                            $('.resize-container').css({
                                'left': $(window).width() / 2 - $('.crop-result').width() / 2
                            });
                            // Assign the container to a variable
                            $container = $(image_target).parent('.resize-container');

                            // Add events
                            $container.on('mousedown touchstart', '.resize-handle', startResize);
                            $container.on('mousedown touchstart', 'img', startMoving);
                            $container.on('mousedown touchstart', '.resize-wide', startMoving);
                        };

                        var startResize = function (e) {
                            e.preventDefault();
                            e.stopPropagation();
                            saveEventState(e);
                            $(document).on('mousemove touchmove', resizing);
                            $(document).on('mouseup touchend', endResize);
                        };

                        var endResize = function (e) {
                            e.preventDefault();
                            $(document).off('mouseup touchend', endResize);
                            $(document).off('mousemove touchmove', resizing);
                        };

                        var saveEventState = function (e) {
                            // Save the initial event details and container state
                            event_state.container_width = $container.width();
                            event_state.container_height = $container.height();
                            event_state.container_left = $container.offset().left;
                            event_state.container_top = $container.offset().top;
                            event_state.mouse_x = (e.clientX || e.pageX || e.originalEvent.touches[0].clientX) + $(window).scrollLeft();
                            event_state.mouse_y = (e.clientY || e.pageY || e.originalEvent.touches[0].clientY) + $(window).scrollTop();

                            // This is a fix for mobile safari
                            // For some reason it does not allow a direct copy of the touches property
                            if (typeof e.originalEvent.touches !== 'undefined') {
                                event_state.touches = [];
                                $.each(e.originalEvent.touches, function (i, ob) {
                                    event_state.touches[i] = {};
                                    event_state.touches[i].clientX = 0 + ob.clientX;
                                    event_state.touches[i].clientY = 0 + ob.clientY;
                                });
                            }
                            event_state.evnt = e;
                        };

                        var resizing = function (e) {
                            var mouse = {}, width, height, left, top, offset = $container.offset();
                            mouse.x = (e.clientX || e.pageX || e.originalEvent.touches[0].clientX) + $(window).scrollLeft();
                            mouse.y = (e.clientY || e.pageY || e.originalEvent.touches[0].clientY) + $(window).scrollTop();

                            // Position image differently depending on the corner dragged and constraints
                            if ($(event_state.evnt.target).hasClass('resize-handle-se')) {
                                width = mouse.x - event_state.container_left;
                                height = mouse.y - event_state.container_top;
                                left = event_state.container_left;
                                top = event_state.container_top;
                            } else if ($(event_state.evnt.target).hasClass('resize-handle-sw')) {
                                width = event_state.container_width - (mouse.x - event_state.container_left);
                                height = mouse.y - event_state.container_top;
                                left = mouse.x;
                                top = event_state.container_top;
                            } else if ($(event_state.evnt.target).hasClass('resize-handle-nw')) {
                                width = event_state.container_width - (mouse.x - event_state.container_left);
                                height = event_state.container_height - (mouse.y - event_state.container_top);
                                left = mouse.x;
                                top = mouse.y;
                                if (constrain || e.shiftKey) {
                                    top = mouse.y - ((width / orig_src.width * orig_src.height) - height);
                                }
                            } else if ($(event_state.evnt.target).hasClass('resize-handle-ne')) {
                                width = mouse.x - event_state.container_left;
                                height = event_state.container_height - (mouse.y - event_state.container_top);
                                left = event_state.container_left;
                                top = mouse.y;
                                if (constrain || e.shiftKey) {
                                    top = mouse.y - ((width / orig_src.width * orig_src.height) - height);
                                }
                            }

                            // Optionally maintain aspect ratio
                            if (constrain || e.shiftKey) {
                                height = width / orig_src.width * orig_src.height;
                            }

                            if (width > min_width && height > min_height && width < max_width && height < max_height) {
                                // To improve performance you might limit how often resizeImage() is called
                                resizeImage(width, height);
                                // Without this Firefox will not re-calculate the the image dimensions until drag end
                                $container.offset({'left': left, 'top': top});
                            }
                        }

                        var resizeImage = function (width, height) {
                            resize_canvas.width = width;
                            resize_canvas.height = height;
                            resize_canvas.getContext('2d').drawImage(orig_src, 0, 0, width, height);
                            $(image_target).attr('src', resize_canvas.toDataURL("image/png"));
                        };

                        var startMoving = function (e) {
                            e.preventDefault();
                            e.stopPropagation();
                            saveEventState(e);
                            $(document).on('mousemove touchmove', moving);
                            $(document).on('mouseup touchend', endMoving);
                        };

                        var endMoving = function (e) {
                            e.preventDefault();
                            $(document).off('mouseup touchend', endMoving);
                            $(document).off('mousemove touchmove', moving);
                        };

                        var moving = function (e) {
                            var mouse = {}, touches;
                            e.preventDefault();
                            e.stopPropagation();

                            touches = e.originalEvent.touches;

                            mouse.x = (e.clientX || e.pageX || touches[0].clientX) + $(window).scrollLeft();
                            mouse.y = (e.clientY || e.pageY || touches[0].clientY) + $(window).scrollTop();
                            $container.offset({
                                'left': mouse.x - ( event_state.mouse_x - event_state.container_left ),
                                'top': mouse.y - ( event_state.mouse_y - event_state.container_top )
                            });
                            // Watch for pinch zoom gesture while moving
                            if (event_state.touches && event_state.touches.length > 1 && touches.length > 1) {
                                var width = event_state.container_width, height = event_state.container_height;
                                var a = event_state.touches[0].clientX - event_state.touches[1].clientX;
                                a = a * a;
                                var b = event_state.touches[0].clientY - event_state.touches[1].clientY;
                                b = b * b;
                                var dist1 = Math.sqrt(a + b);

                                a = e.originalEvent.touches[0].clientX - touches[1].clientX;
                                a = a * a;
                                b = e.originalEvent.touches[0].clientY - touches[1].clientY;
                                b = b * b;
                                var dist2 = Math.sqrt(a + b);

                                var ratio = dist2 / dist1;

                                width = width * ratio;
                                height = height * ratio;
                                // To improve performance you might limit how often resizeImage() is called
                                resizeImage(width, height);
                            }
                        };

                        init();
                    };

                    $('#tamtamSend').click(function () {
                        var $bgImg = $('.slick-active img');
                        var bgImg = $('.slick-active img')[0];
                        var bgWidth = $bgImg.width();
                        var bgHeight = $bgImg.height();
                        var $canvas = $('#tamtam-canvas');
                        $canvas.attr('width', bgWidth).attr('height', bgHeight);
                        var $img = $('.crop-result');
                        var imgWidth = $img.width();
                        var imgHeight = $img.height();
                        var leftImg = parseInt($img.closest('.resize-container').css('left'));
                        var topImg = parseInt($img.closest('.resize-container').css('top'));
                        var canvas = $('#tamtam-canvas')[0];
                        var ctx = canvas.getContext('2d');
                        ctx.drawImage($img[0], leftImg, topImg, imgWidth, imgHeight);
                        ctx.drawImage(bgImg, 0, 0, bgWidth, bgHeight);
                        var data = canvas.toDataURL();

                        $rootScope.$broadcast('tantamareska:imageMerged', {
                            image: data
                        });

/*
                        $('.tamtam-share').attr('src', data);
                        $('.vk-share').attr('href', 'http://vk.com/share.php?url=' + data);*/
                        return false;
                    });
                    $(document).on('click', '.sharing-link', function(){
                        window.open($(this).attr('href'),"","width=400,height=400");
                        return false;
                    });
                    
                });
            }
        }
    });