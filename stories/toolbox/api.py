from tastypie.authorization import Authorization
from tastypie.resources import ModelResource
from tastypie import fields

from toolbox.models import Project, Goal, Story


class BaseResource(ModelResource):
    def determine_format(self, request):
        return "application/json" 


class ProjectResource(BaseResource):
    class Meta:
        queryset = Project.objects.all()
        resource_name = 'projects'
        authorization= Authorization()


class GoalResource(BaseResource):
    project = fields.ForeignKey(ProjectResource, 'project', full=True)

    class Meta:
        queryset = Goal.objects.all()
        resource_name = 'goals'
        authorization= Authorization()


class StoryResource(BaseResource):
    project = fields.ForeignKey(ProjectResource, 'project', full=True)
    goal = fields.ForeignKey(GoalResource, 'goal', full=True)

    class Meta:
        queryset = Story.objects.all()
        resource_name = 'stories'
        authorization= Authorization()
