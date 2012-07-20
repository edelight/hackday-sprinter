"""Stories views"""
from django.shortcuts import render_to_response
from django.template import RequestContext

from toolbox.models import Project, Goal, Story


def main(request):
    """Default main view"""
    data = {'projects': Project.objects.all(), 
            'goals': Goal.objects.filter(closed__isnull=True),
            'stories': Story.objects.filter(closed__isnull=True)}
    return render_to_response('base.html',
                              data, context_instance=RequestContext(request))
