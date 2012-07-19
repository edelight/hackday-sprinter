from django.contrib import admin
from toolbox.models import *

class StoryAdmin(admin.ModelAdmin):
    pass
class GoalAdmin(admin.ModelAdmin):
    pass
class ProjectAdmin(admin.ModelAdmin):
    pass

admin.site.register(Story, StoryAdmin)
admin.site.register(Goal, GoalAdmin)
admin.site.register(Project, ProjectAdmin)
