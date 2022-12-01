from django.urls import path

from . import views

urlpatterns = [
    # path('', views.getRoutes, name='routes'),

    path('gallery/<str:user>', views.get_photos_user, name='photos'),
    path('photo/add', views.add_photo, name='add-photo'),
    path('photo/delete/<str:id>', views.delete_photo, name='delete-photo'),
    path('museum_image/<str:image>',
         views.get_museum_image_data, name='get-museum-image'),
    path('dalle/all',
         views.get_all_dalle_creations, name='all-dalle-creations'),
    path('dalle/<str:user>',
         views.create_art, name='create-art-for-user'),

    path('user/add', views.add_user, name='add-user'),
    path('user/all', views.get_users, name='get-all-users'),
    path('user/<str:user>', views.get_user, name='user'),

    # path('pactiv/<str:pk>/edit', views.edit_personal_activity,
    #      name='edit-personal-activity'),
    # path('pactiv/<str:pk>/delete', views.delete_personal_activity,
    #      name='delete-personal-activity'),
    # path('pactiv/<str:pk>', views.get_personal_activity, name='personal-activity'),
    # path('pactiv/filter/<str:activ>/<str:user>', views.get_personal_activity_user,
    #      name='personal-activity-filter-user'),

    # path('activ/', views.get_activities, name='activities'),
    # path('activ/add', views.add_activity, name='add-activity'),
    # path('activ/<str:pk>/edit', views.edit_activity, name='edit-activity'),
    # path('activ/<str:pk>/delete', views.delete_activity, name='delete-activity'),
    # path('activ/<str:pk>', views.get_activity, name='activity'),

    # path('users/', views.get_users, name='users'),
    # path('users/<str:pk>', views.get_user, name='user'),
]
