# Vitor: red car (mandei)
#galogico: Procurar como mudar a rotação de um objeto


import pygame
import math

pygame.init()
screen = pygame.display.set_mode((1280, 720))
clock = pygame.time.Clock()
running = True
dt = 0


speedY = 0
speedX = 0
GenSpeed = 0
direction = 0
player_pos = pygame.Vector2(screen.get_width() / 2, screen.get_height() / 2)

while running:
    # poll for events
    # pygame.QUIT event means the user clicked X to close your window
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

    # fill the screen with a color to wipe away anything from last frame
    screen.fill("black")

    rect = pygame.draw.rect(screen, "red", pygame.Rect(player_pos.x, player_pos.y, 18, 30))

    # Player Movement
    keys = pygame.key.get_pressed()
    if keys[pygame.K_w]:
        GenSpeed += 0.01
    if keys[pygame.K_s]:
        GenSpeed -= 0.01

    if keys[pygame.K_a]:
        direction += 0.01
    if keys[pygame.K_d]:
        direction -= 0.01

    speedY = math.sin(direction)
    speedX = math.cos(direction)

    player_pos.y -= 100 * dt * speedX * GenSpeed
    player_pos.x -= 100 * dt * speedY * GenSpeed

    

    # flip() the display to put your work on screen
    pygame.display.flip()

    # limits FPS to 60
    # dt is delta time in seconds since last frame, used for framerate-
    # independent physics.
    dt = clock.tick(60) / 1000

pygame.quit()
