from PyQt5 import QtWidgets, QtGui, QtCore
from PyQt5.QtWidgets import * 
from PyQt5.QtGui import *
import sys
  
n = None #range pola arr
arr = None
predpis = []

#all functions triggred by ui buttons

def combinations():
    j = 0 #stlpce pola arr
    #vsetky prvotne kombinacie
    #prechadzam riadkami arr
    for i in range(n):
        #prechadzam stlpcami arr
        while j < 2**n:
            #prechadzam jednotlivymi prvkami daneho pola (F(2))
            for b in range(2):
                #postupne menim frekvencie striedani 0 a 1
                for c in range(2**i):
                    #priradim dany prvok pola v ktorom som (F(2))
                    arr[i][j] = b 
                    j+=1
        j = 0

    for i in range(n):
        for j in range(2**n):
            print(arr[i][j],end=" ")
        print('\n')

def generatePredpis():
    inputEquation = [3,1,0]
    global n
    n = inputEquation[0]
    global arr
    arr = [[0 for x in range(2**n)] for y in range(n)]

    for i in range(1, len(inputEquation)):
        #vytvori predpis podla kt. sa budu pocitat jednotlive prvky v
        #linearnej rek.	
        predpis.append(inputEquation[i] - inputEquation[0])
    
    for i in range(len(predpis)):
        print(predpis[i],end=" ")
    print()

def mainCalculations():
    p = None
    i = n

    while(p == None):
        #adds a new line to the two dimensional array
        arr.append([])
        for j in range(2**n):
            sucet = 0
            for l in range(len(predpis)):
                sucet = sucet + arr[i + predpis[l]][j]
            sucet = sucet % 2
            arr[i].append(sucet)

        p = kontrolaRiadkov(i)
        i+=1
    print('p: ', p)

def kontrolaRiadkov(rownumber):
    if kontrolaRovnostiRiadkov(arr[rownumber], arr[n-1]):
        state = True
        for k in range(2,n+1):
            if kontrolaRovnostiRiadkov(arr[rownumber+1-k], arr[n-k]) == False:
                state = False
        if state:
            #velkost periody
            return rownumber+1-k

def kontrolaRovnostiRiadkov(row1, row2):
    strJoined1 = ''.join([str(x) for x in row1])
    strJoined2 = ''.join([str(x) for x in row2])
    print(strJoined1, '?', strJoined2)

    if strJoined1 == strJoined2:
        return True

    return False

def gui():
    app = QApplication(sys.argv)
    window = QWidget()
    window.setWindowTitle('RAL')
    
    explanation = QLabel(window)
    explanation.setText('Zadajte dolné indexy k 0..n v poradí zľava doprava, ako je ukázané na ukážke:')
    explanation.move(50,30)

    imgHolder = QLabel(window)
    img = QPixmap('example1.png')
    imgHolder.setPixmap(img.scaled(350, 350, QtCore.Qt.KeepAspectRatio))
    imgHolder.move(50,50)

    explanation2 = QLabel(window)
    explanation2.setText('Čísla oddeľujte čiarkami.')
    explanation2.move(50,150)

    input = QLineEdit(window)
    input.move(50,170)

    button = QPushButton(window)
    button.move(440, 170)
    button.setText('Start')

    window.show()

    sys.exit(app.exec_())

generatePredpis()
combinations()
mainCalculations()
gui()