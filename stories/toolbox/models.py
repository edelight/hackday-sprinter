from django.db import models


class Story(models.Model):
    PRIO = (
        (1, "High"),
        (2, "Medium"),
        (3, "Low")
    )
    project = models.ForeignKey("Project")
    goal = models.ForeignKey("Goal", null=True, blank=True)
    title = models.CharField(max_length=140)
    description = models.TextField(blank=True)
    priority = models.IntegerField(max_length=1, choices=PRIO, default=2)
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "story"
        verbose_name = "Story"
        verbose_name_plural = "Stories"

    def __unicode__(self):
        return "%(title)s" % {"title": self.title}


class Goal(models.Model):
    title = models.CharField(max_length=64)
    description = models.TextField()
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)
    started = models.DateTimeField(null=True, blank=True)
    closed = models.DateTimeField(null=True, blank=True)

    class Meta:
        db_table = "goal"
        verbose_name = "Goal"
        verbose_name_plural = "Goals"

    def __unicode__(self):
        return "%(title)s" % {"title": self.title}


class Project(models.Model):
    name = models.CharField(max_length=128)

    class Meta:
        db_table = "project"
        verbose_name = "Project"
        verbose_name_plural = "Projects"

    def __unicode__(self):
        return "%(name)s" % {"name": self.name}
