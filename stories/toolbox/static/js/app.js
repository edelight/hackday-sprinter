$(function() {
    //setup the user story accordion
    initAccordion = function() {
        $('.accordion').accordion({
            header: '> div > h3',
            active: false,
            collapsible: true,
            autoHeight: false
        });

        $('.sortable').sortable({
            handle: 'h3',
            stop: function(event, ui) {
                // IE doesn't register the blur when sorting
                // so trigger focusout handlers to remove .ui-state-focus
                ui.item.children('h3').triggerHandler('focusout');
            },
            connectWith: '.sortable',
            placeholder: 'ui-state-highlight ui-corner-all'
        });
    };

    writeBacklog = function(template) {
        $.ajax({
            type: 'POST',
            url: '/api/stories/',
            data: {
                pid: $('#project').val(),
                priority: $('#priority').val(),
                title: $('#title').val(),
                description: $('#story').val()
            },
            dataType: 'json',
            success: function (response) {
                console.log(response);
            }
        });

        $('#stories').prepend(template);
        $('#story-form').dialog('close');
        $('.accordion').accordion('destroy');
        initAccordion();
    };

    //initialize the add story dialog
    $('#story-form').dialog({
        autoOpen: false,
        height: 375,
        width: 400,
        modal: true,
        buttons: [{
            text: 'Add',
            click: function() {
                var title    = $('#title').val(),
                    content  = $('#story').val(),
                    project  = $('#project').find('option:selected').text(),
                    priority = $('#priority').val()
                    template = $('<div class="group">' +
                                 '<h3><a href="#"><span class="project">' + project + '</span> &ndash; ' + title + '<span class="priority priority-' + priority + '"></span></a></h3>' +
                                 '<div>' + content + '</div>' +
                                 '</div>');

                if(title === '') {
                    $('#title').addClass('form-error');
                } else {
                    $('#title').removeClass('form-error');
                }
                if(content === '') {
                    $('#story').addClass('form-error');
                }else {
                    $('#story').removeClass('form-error');
                }
                if(title !== '' && content !== '') {
                    writeBacklog(template);
                }
            },
        }, {
            text: 'Cancel',
            click: function() {
                $(this).dialog('close');
            }
        }],
        close: function() {
           $('.text, .textarea, .select').val('');
        },
        open: function() {
            $(this).parent().find('.ui-dialog-buttonpane button:first-child').button({
                icons: { primary: 'ui-icon-disk' }
            });
            $(this).parent().find('.ui-dialog-buttonpane button:first-child').next().button({
                icons: { primary: 'ui-icon-close' }
            });

        }
    });

    //crate the add user story button
    $('#create-story').button().click(function() {
        $('#story-form').dialog('open');
    });

    initAccordion();
});