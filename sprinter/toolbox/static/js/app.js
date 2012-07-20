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
            connectWith: '.sortable',
            placeholder: 'ui-state-highlight ui-corner-all',
            receive: function(event, ui) { 
                if($(this).attr('data-project-id') !== ui.item.attr('data-project-id') && $(this).parent().hasClass('goal')) {
                    alert('Story project and goal project do not match!');
                    $(ui.sender).sortable('cancel');
                } else {
                    var storyid = ui.item.attr('data-story-id'),
                        goalid  = $(this).attr('data-goal-id');

                    updateStory(storyid, goalid);
                }
            },
            stop: function(event, ui) {
                ui.item.children('h3').triggerHandler('focusout');
            },
        });
    };

    writeBacklog = function(template) {
        var data = JSON.stringify({
            "project":  "/api/projects/" + $('#project').val() + "/",
            "priority": $('#priority').val(),
            "title": $('#title').val(),
            "description": $('#story').val()
        });

        $.ajax({
            type: 'POST',
            url: '/api/stories/',
            data: data,
            dataType: 'json',
            contentType: 'application/json',
            processData: false,
            success: function (response) {
                console.log(response);
            }
        });

        $('#stories').prepend(template);
        $('#story-form').dialog('close');
        $('.accordion').accordion('destroy');
        initAccordion();
    };

   writeGoals = function(template) {
        var data = JSON.stringify({
            "project": "/api/projects/" + $('#goal-form #project').val() + "/",
            "title": $('#goal-form #title').val(),
            "description": $('#goal-form #goal').val()
        });

        $.ajax({
            type: 'POST',
            url: '/api/goals/',
            data: data,
            dataType: 'json',
            contentType: 'application/json',
            processData: false,
            success: function (response) {
                console.log(response);
            }
        });

        $('#goals').prepend(template);
        $('#goal-form').dialog('close');
        $('.accordion').accordion('destroy');
        initAccordion();
    };

    updateStory = function(storyid, goalid) {
        var data = JSON.stringify({
            "resource_uri": "/api/projects/" + goalid + "/"
        });

        $.ajax({
            type: 'PATCH',
            url: '/api/stories/' + storyid + '/',
            data: data,
            dataType: 'json',
            contentType: 'application/json',
            processData: false,
            success: function (response) {
                console.log(response);
            }
        });
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


    //initialize the add story dialog
    $('#goal-form').dialog({
        autoOpen: false,
        height: 375,
        width: 400,
        modal: true,
        buttons: [{
            text: 'Add',
            click: function() {
                var title    = $('#goal-form #title').val(),
                    content  = $('#goal-form #goal').val(),
                    project  = $('#goal-form #project').find('option:selected').text(),
                    date     = new Date(),
                    formatteddate = date.format('mmmm dd, yyyy, h:MM tt'),
                    template = $('<div class="goal ui-widget ui-state-default ui-corner-all">' +
                                 '<h2><span class="project">' + project + '</span> &ndash; ' + title + '<small class="floatright">' + formatteddate + '</small></h2>' +
                                 '<p>' + content + '</p>' +
                                 '</div>');

                if(title === '') {
                    $('#title').addClass('form-error');
                } else {
                    $('#title').removeClass('form-error');
                }
                if(content === '') {
                    $('#goal').addClass('form-error');
                }else {
                    $('#goal').removeClass('form-error');
                }
                if(title !== '' && content !== '') {
                    writeGoals(template);
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


    //crate the add goal button
    $('#create-goal').button().click(function() {
        $('#goal-form').dialog('open');
    });

    initAccordion();
});
