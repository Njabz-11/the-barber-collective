const BusinessSettings = ({ business, onUpdate }: { business: any; onUpdate: () => void }) => (
  <div className="glass-card p-6">
    <h2 className="text-xl font-bold mb-4">Business Settings</h2>
    <p className="text-muted-foreground">Update your business information.</p>
  </div>
);
export default BusinessSettings;
