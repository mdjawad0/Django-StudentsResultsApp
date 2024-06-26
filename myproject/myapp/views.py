from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse
from .models import Student, SubjectMarks

def student_detail(request, id):
    student = get_object_or_404(Student, pk=id)
    subject_marks = SubjectMarks.objects.get(student=student)
    context = {
        'student': student,
        'subject_marks': subject_marks,
    }
    return render(request, 'myapp/student_detail.html', context)

def student_result(request):
    return render(request, 'myapp/student_result.html')

def student_detail_api(request, id):
    try:
        student = Student.objects.get(pk=id)
        subject_marks = SubjectMarks.objects.get(student=student)
        data = {
            'id': student.id,
            'name': student.name,
            'language1': subject_marks.language1,
            'language2': subject_marks.language2,
            'acting': subject_marks.acting,
            'dance': subject_marks.dance
        }
        return JsonResponse(data)
    except Student.DoesNotExist:
        return JsonResponse({'error': 'Student not found'}, status=404)
