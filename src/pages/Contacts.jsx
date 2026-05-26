import { useState } from 'react';
import { UserPlus, Phone, Trash2 } from 'lucide-react';

const Contacts = () => {
  const [contacts, setContacts] = useState(() => {
    const saved = localStorage.getItem('rescuenet_contacts');
    return saved ? JSON.parse(saved) : [];
  });
  const [isAdding, setIsAdding] = useState(false);
  const [newContact, setNewContact] = useState({ name: '', phone: '', relation: '' });

  const saveContacts = (updated) => {
    setContacts(updated);
    localStorage.setItem('rescuenet_contacts', JSON.stringify(updated));
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newContact.name || !newContact.phone) return;
    
    const updated = [...contacts, { ...newContact, id: Date.now() }];
    saveContacts(updated);
    setNewContact({ name: '', phone: '', relation: '' });
    setIsAdding(false);
  };

  const handleDelete = (id) => {
    const updated = contacts.filter(c => c.id !== id);
    saveContacts(updated);
  };

  return (
    <div className="min-h-screen pb-24 pt-20 px-4">
      <div className="max-w-md mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-white">RescueNet Emergency Contacts</h1>
          <button 
            onClick={() => setIsAdding(!isAdding)}
            className="w-10 h-10 bg-primary/20 text-primary rounded-full flex items-center justify-center hover:bg-primary/30 transition"
          >
            <UserPlus size={20} />
          </button>
        </div>

        {isAdding && (
          <div className="glass-card p-5 rounded-2xl mb-6">
            <h3 className="text-white font-semibold mb-4">Add New Contact</h3>
            <form onSubmit={handleAdd} className="space-y-4">
              <div>
                <input 
                  type="text" 
                  placeholder="Full Name" 
                  value={newContact.name}
                  onChange={e => setNewContact({...newContact, name: e.target.value})}
                  className="w-full bg-darker border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition"
                  required
                />
              </div>
              <div>
                <input 
                  type="tel" 
                  placeholder="Phone Number" 
                  value={newContact.phone}
                  onChange={e => setNewContact({...newContact, phone: e.target.value})}
                  className="w-full bg-darker border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition"
                  required
                />
              </div>
              <div>
                <input 
                  type="text" 
                  placeholder="Relation (e.g., Brother)" 
                  value={newContact.relation}
                  onChange={e => setNewContact({...newContact, relation: e.target.value})}
                  className="w-full bg-darker border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition"
                />
              </div>
              <div className="flex gap-2 pt-2">
                <button type="button" onClick={() => setIsAdding(false)} className="flex-1 py-3 rounded-xl bg-card text-white hover:bg-gray-800 transition">Cancel</button>
                <button type="submit" className="flex-1 py-3 rounded-xl bg-primary text-white font-semibold hover:bg-primary-hover transition">Save</button>
              </div>
            </form>
          </div>
        )}

        {contacts.length === 0 && !isAdding ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-card rounded-full flex items-center justify-center mx-auto mb-4">
              <UserPlus size={24} className="text-gray-500" />
            </div>
            <h3 className="text-white font-semibold">No contacts saved</h3>
            <p className="text-gray-400 text-sm mt-1">Add RescueNet contacts who should be notified in an emergency.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {contacts.map(contact => (
              <div key={contact.id} className="glass p-4 rounded-2xl flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-white">{contact.name}</h3>
                  <p className="text-sm text-gray-400">{contact.relation || 'Emergency Contact'}</p>
                  <p className="text-primary text-sm mt-1 flex items-center gap-1">
                    <Phone size={12} /> {contact.phone}
                  </p>
                </div>
                <button 
                  onClick={() => handleDelete(contact.id)}
                  className="w-10 h-10 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center hover:bg-red-500/20 transition"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Contacts;
