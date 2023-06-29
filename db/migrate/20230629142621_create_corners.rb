class CreateCorners < ActiveRecord::Migration[7.0]
  def change
    create_table :corners do |t|
      t.string :name
      t.float :velocity

      t.timestamps
    end
  end
end
