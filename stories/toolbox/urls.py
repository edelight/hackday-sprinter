from django.conf.urls import patterns, include, url
from django.contrib import admin

from toolbox.api import ProjectResource, GoalResource, StoryResource

admin.autodiscover()

project_resource = ProjectResource()
goal_resource = GoalResource()
story_resource = StoryResource()

urlpatterns = patterns('',
    url(r'^admin/', include(admin.site.urls)),
    (r'^api/', include(project_resource.urls)),
    (r'^api/', include(goal_resource.urls)),
    (r'^api/', include(story_resource.urls)),
)
