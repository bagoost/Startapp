import firebase_admin
from django.conf import settings
from firebase_admin import credentials, firestore

cred = credentials.Certificate(settings.FIREBASE_CREDENTIALS)
firebase_admin.initialize_app(cred)

db = firestore.client()
