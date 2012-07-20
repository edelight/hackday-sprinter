"""Tests for the Stories dashboard app"""
from django.test import TestCase
from django.db import IntegrityError

from toolbox.models import Project


class TestProject(TestCase):

    def test_unique_name(self):
        """Should not allow to create a project when the same name exists"""
        p = Project(name="foo")
        p.save()
        p = Project(name="foo")
        self.assertRaises(IntegrityError, p.save)
