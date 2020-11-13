var fullScreenRenderer = vtk.Rendering.Misc.vtkFullScreenRenderWindow.newInstance();
var actor              = vtk.Rendering.Core.vtkActor.newInstance();
var mapper             = vtk.Rendering.Core.vtkMapper.newInstance();
var cone               = vtk.Filters.Sources.vtkSphereSource.newInstance();

actor.setMapper(mapper);
mapper.setInputConnection(cone.getOutputPort());

var renderer = fullScreenRenderer.getRenderer();
renderer.addActor(actor);
renderer.resetCamera();

var renderWindow = fullScreenRenderer.getRenderWindow();
renderWindow.render();
