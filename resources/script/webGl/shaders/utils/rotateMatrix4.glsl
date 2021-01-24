mat4 rotate4X(float r) {
  return
    mat4(
      1.0, 0.0, 0.0, 0.0,
      0.0, cos(r), -sin(r), 0.0,
      0.0, sin(r), cos(r), 0.0,
      0.0, 0.0, 0.0, 1.0
    );
}

mat4 rotate4Y(float r) {
  return
    mat4(
      cos(r), 0.0, sin(r), 0.0,
      0.0, 1.0, 0.0, 0.0,
      -sin(r), 0.0, cos(r), 0.0,
      0.0, 0.0, 0.0, 1.0
    );
}

mat4 rotate4Z(float r) {
  return
    mat4(
      cos(r), -sin(r), 0.0, 0.0,
      sin(r), cos(r), 0.0, 0.0,
      0.0, 0.0, 1.0, 0.0,
      0.0, 0.0, 0.0, 1.0
    );
}

mat4 rotateMatrix4(vec3 r) {
  return
    rotate4X(r.x)
      * rotate4Y(r.y)
      * rotate4Z(r.z);
}
#pragma glslify: export(rotateMatrix4)
