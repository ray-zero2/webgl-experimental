vec3 grayScale(vec3 color) {
  float red   = 0.298912;
  float green = 0.586611;
  float blue  = 0.114478;
  vec3 gray = vec3(red, green, blue);
  float finalColor = dot(color.rgb, gray);
  return vec3(finalColor);
}

#pragma glslify: export(grayScale);
