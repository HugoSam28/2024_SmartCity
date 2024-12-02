## Vehicule & With_license (héritage)
### **get**
#### - user => YES
#### - authentificated => YES
#### - admin => YES

### **delete**
#### - user => NO
#### - authentificated => NO
#### - admin => YES

### **patch**
#### - user => NO
#### - authentificated => YES (dispo/pas dispo)
#### - admin => YES

### **post**
#### - user => NO
#### - authentificated => NO
#### - admin => YES



## Trip
### **get**
#### - user => NO
#### - authentificated => YES (les siens)
#### - admin => YES

### **delete**
#### - user => NO
#### - authentificated => NO
#### - admin => YES

### **patch**
#### - user => NO
#### - authentificated => NO
#### - admin => YES

### **post**
#### - user => NO
#### - authentificated => YES (les siens)
#### - admin => YES



## Client
### **get**
#### - user => NO
#### - authentificated => YES (le sien)
#### - admin => YES

### **delete**
#### - user => NO
#### - authentificated => NO
#### - admin => YES

### **patch**
#### - user => NO
#### - authentificated => YES (le sien)
#### - admin => YES

### **post**
#### - user => YES (lors de la création)
#### - authentificated => NO
#### - admin => YES



## Sponsoring
### **get**
#### - user => NO
#### - authentificated => YES (les siens)
#### - admin => YES

### **delete**
#### - user => NO
#### - authentificated => YES (les siens)
#### - admin => YES

### **patch**
#### - user => NO
#### - authentificated => NO
#### - admin => YES

### **post**
#### - user => NO
#### - authentificated => YES
#### - admin => YES



## Subscription
### **get**
#### - user => YES
#### - authentificated => YES 
#### - admin => YES

### **delete**
#### - user => NO
#### - authentificated => NO
#### - admin => YES

### **patch**
#### - user => NO
#### - authentificated => NO
#### - admin => YES

### **post**
#### - user => NO
#### - authentificated => NO
#### - admin => YES



## Car_key
### **get**
#### - user => NO
#### - authentificated => NO 
#### - admin => YES

### **delete**
#### - user => NO
#### - authentificated => NO
#### - admin => YES

### **patch**
#### - user => NO
#### - authentificated => NO
#### - admin => YES

### **post**
#### - user => NO
#### - authentificated => NO
#### - admin => YES