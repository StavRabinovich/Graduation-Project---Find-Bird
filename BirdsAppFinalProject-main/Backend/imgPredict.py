import os
import numpy as np

import tensorflow as tf
from tensorflow import keras

from keras.preprocessing import image
from keras.applications.densenet import decode_predictions, preprocess_input
from keras.applications.vgg16 import decode_predictions, preprocess_input
from keras.applications.efficientnet import decode_predictions, preprocess_input
from keras.applications.vgg16 import VGG16, preprocess_input


saved_details = [['DenseNet', 0.8, 0.134],
                ['EfficientNet', 0.4, 0.54],
                ['VGG', 0.6, 0.332]]

def get_best_model():
  mdl = [None, 0, 1]
  for res in saved_details:
    if (res[1] > mdl[1]) or (res[1] == mdl[1] and res[2]< mdl[2]): 
      mdl = res
  return mdl[0]

def load_best_model(model_name):
  if model_name == 'DenseNet':
    t_model = tf.keras.models.load_model('myModels/DenseNet')
  elif model_name == 'EfficientNet':
    t_model = tf.keras.models.load_model('myModels/EfficientNet')
  else:
    t_model = tf.keras.models.load_model('myModels/VGG')
  return t_model

def get_img_predict(img_path):
  # Model choose and upload
  model = load_best_model(get_best_model)
  # Image
  img = image.load_image(img_path, target_size=(224,224))
  img_array = image.img_to_array(img)
  img_batch = np.expand_dims(img_array, axis=0)

  # Batch and preprocessing
  img_preproccessed = preprocess_images(img_batch)

  # run model 
  prediction = model.predict(img_preproccessed)  
  
  #prediction
  res = decode_predictions(prediction,top=1)[0]
  print(res)
  if res[1]< 0.6: 
    return ("OTHER")
  return(res[0])

