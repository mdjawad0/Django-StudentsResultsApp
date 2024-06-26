from django.db import models

class Student(models.Model):
    name = models.CharField(max_length=100)
    age = models.IntegerField()
    email = models.EmailField(unique=True)
    city = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class SubjectMarks(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    language1 = models.IntegerField()
    language2 = models.IntegerField()
    acting = models.IntegerField()
    dance = models.IntegerField()

    def __str__(self):
        return f"Marks for {self.student.name}"
